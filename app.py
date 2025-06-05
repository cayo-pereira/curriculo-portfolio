import os
import json
from dotenv import load_dotenv
from flask import Flask, render_template, request, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

load_dotenv()

app = Flask(__name__)

app.secret_key = os.getenv('FLASK_SECRET_KEY', 'supersecretkey_fallback')
app.config['UPLOAD_FOLDER_RELATIVE_TO_STATIC'] = os.path.join('img', 'uploads')
app.config['UPLOAD_FOLDER_PHYSICAL'] = os.path.join(app.root_path, 'static', 'img', 'uploads')
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

DATA_FILE = 'data.json'

def load_data():
    if not os.path.exists(DATA_FILE):
        admin_username_initial = os.getenv('ADMIN_USERNAME', 'admin')
        admin_password_initial = os.getenv('ADMIN_PASSWORD', 'admin123')

        default_data = {
            "credentials": {
                "username": admin_username_initial,
                "password": generate_password_hash(admin_password_initial)
            },
            "index_content": {
                "header_typed_text": ["Sejam bem vindos ao meu currículo e portfolio web."],
                "sobre_titulo": "Meu nome é Cayo Pereira",
                "sobre_texto": "Atualmente tenho 27 anos, resido em Nilópolis/RJ...",
                "competencias_titulo": "Competências",
                "competencias_texto_html": "<div class=\"competencias-grid\"><div>• Pacote Office<br>• Pacote Adobe...</div></div>",
                "experiencias_titulo": "Experiências",
                "experiencias_texto": "Possuo experiências de trabalho com atendimento ao cliente...",
                "experiencias2_titulo": "Continuação das Experiências",
                "experiencias2_texto": "Autônomo (2020 - Atual)<br>Suporte técnico...",
                "educacao_titulo": "Educação",
                "educacao_texto": "Minha formação educacional:<br><br>Bacharel em Engenharia da Computação..."
            },
            "portfolio_content": {
                "header_typed_text": ["Portfólio de Cayo Pereira<br>Confira meus principais projetos e trabalhos."],
                "sobre_titulo": "Projetos em destaque",
                "sobre_texto": "Aqui estão alguns dos projetos que desenvolvi...",
                "sobre2_titulo": "Detalhes dos projetos",
                "sobre2_texto": "Nos projetos você vai encontrar:<br><br>• O site atual...",
                "galeria_titulo": "Galeria de imagens",
                "gallery_images": []
            }
        }
        save_data(default_data)
        return default_data
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        flash("Arquivo de dados não encontrado ou corrompido. Será recriado com valores padrão.", "warning")
        if os.path.exists(DATA_FILE):
            try:
                os.rename(DATA_FILE, DATA_FILE + ".corrupted." + str(os.path.getmtime(DATA_FILE)))
            except OSError:
                pass
        return load_data()


def save_data(data):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/')
def home():
    data = load_data()
    return render_template('index.html', content=data.get('index_content', {}))

@app.route('/portfolio')
def portfolio():
    data = load_data()
    gallery_images_data = data.get('portfolio_content', {}).get('gallery_images', [])
    processed_gallery_images = []
    for img_data in gallery_images_data:
        path_inside_static = os.path.join(app.config['UPLOAD_FOLDER_RELATIVE_TO_STATIC'], img_data['filename'])
        filename_for_url = path_inside_static.replace(os.sep, '/')
        processed_gallery_images.append({
            'src': url_for('static', filename=filename_for_url),
            'alt': img_data.get('original_filename', img_data['filename']),
            'info': img_data['info']
        })

    portfolio_data = data.get('portfolio_content', {})
    portfolio_data['gallery_images_processed'] = processed_gallery_images
    return render_template('portfolio.html', content=portfolio_data)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user_id' in session:
        return redirect(url_for('admin_dashboard'))
    
    if request.method == 'POST':
        username_form = request.form['username']
        password_form = request.form['password']
        data = load_data()
        admin_user = data.get('credentials', {})

        if username_form == admin_user.get('username') and check_password_hash(admin_user.get('password', ''), password_form):
            session['user_id'] = username_form
            flash('Login realizado com sucesso!', 'success')
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Nome de usuário ou senha inválidos.', 'danger')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('Você foi desconectado.', 'info')
    return redirect(url_for('login'))

@app.route('/admin', methods=['GET'])
def admin_dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    data = load_data()
    gallery_images_data_admin = data.get('portfolio_content', {}).get('gallery_images', [])
    processed_gallery_images_admin = []
    
    for img_data in gallery_images_data_admin:
        path_inside_static = os.path.join(app.config['UPLOAD_FOLDER_RELATIVE_TO_STATIC'], img_data['filename'])
        filename_for_url = path_inside_static.replace(os.sep, '/')
        processed_gallery_images_admin.append({
            'src': url_for('static', filename=filename_for_url),
            'filename': img_data['filename'], 
            'info': img_data['info']
        })
    
    admin_view_data = {
        'index_content': data.get('index_content', {}),
        'portfolio_content': data.get('portfolio_content', {}),
        'gallery_images_admin': processed_gallery_images_admin 
    }
    
    return render_template('admin.html', data=admin_view_data)


@app.route('/admin/update_texts', methods=['POST'])
def admin_update_texts():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    data = load_data()
    
    index_content = data.get('index_content', {})
    index_fields_to_update = [
        'index_header_typed_text', 'index_sobre_titulo', 'index_sobre_texto',
        'index_competencias_titulo', 'index_competencias_texto_html',
        'index_experiencias_titulo', 'index_experiencias_texto',
        'index_experiencias2_titulo', 'index_experiencias2_texto',
        'index_educacao_titulo', 'index_educacao_texto'
    ]
    for field_key_form in index_fields_to_update:
        json_key = field_key_form.replace('index_', '')
        if field_key_form == 'index_header_typed_text':
             index_content[json_key] = [request.form.get(field_key_form, '').strip()]
        else:
            index_content[json_key] = request.form.get(field_key_form, index_content.get(json_key))
    data['index_content'] = index_content

    portfolio_content = data.get('portfolio_content', {})
    portfolio_fields_to_update = [
        'portfolio_header_typed_text', 'portfolio_sobre_titulo', 'portfolio_sobre_texto',
        'portfolio_sobre2_titulo', 'portfolio_sobre2_texto', 'portfolio_galeria_titulo'
    ]
    for field_key_form in portfolio_fields_to_update:
        json_key = field_key_form.replace('portfolio_', '')
        if field_key_form == 'portfolio_header_typed_text':
            portfolio_content[json_key] = [request.form.get(field_key_form, '').strip()]
        else:
            portfolio_content[json_key] = request.form.get(field_key_form, portfolio_content.get(json_key))
    data['portfolio_content'] = portfolio_content

    save_data(data)
    flash('Textos atualizados com sucesso!', 'success')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/upload_image', methods=['POST'])
def admin_upload_image():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    if 'gallery_image' not in request.files:
        flash('Nenhum arquivo selecionado.', 'warning')
        return redirect(url_for('admin_dashboard'))
    
    file = request.files['gallery_image']
    image_info = request.form.get('image_info', 'Informação não fornecida.')

    if file.filename == '':
        flash('Nenhum arquivo selecionado.', 'warning')
        return redirect(url_for('admin_dashboard'))

    if file and allowed_file(file.filename):
        original_filename_secure = secure_filename(file.filename)
        filename_to_save = original_filename_secure
        
        upload_dir_physical = app.config['UPLOAD_FOLDER_PHYSICAL']
        if not os.path.exists(upload_dir_physical):
            os.makedirs(upload_dir_physical)
            
        file_path_physical = os.path.join(upload_dir_physical, filename_to_save)
        
        base, ext = os.path.splitext(original_filename_secure)
        counter = 1
        while os.path.exists(file_path_physical):
            filename_to_save = f"{base}_{counter}{ext}"
            file_path_physical = os.path.join(upload_dir_physical, filename_to_save)
            counter += 1
            
        file.save(file_path_physical)

        data = load_data()
        gallery_images = data.get('portfolio_content', {}).get('gallery_images', [])
        gallery_images.append({
            "filename": filename_to_save,
            "original_filename": original_filename_secure,
            "info": image_info
        })
        data['portfolio_content']['gallery_images'] = gallery_images
        save_data(data)
        flash('Imagem adicionada com sucesso!', 'success')
    else:
        flash('Tipo de arquivo não permitido.', 'danger')
        
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/remove_image/<path:filename_to_remove>', methods=['POST'])
def admin_remove_image(filename_to_remove):
    if 'user_id' not in session:
        return redirect(url_for('login'))

    data = load_data()
    gallery_images = data.get('portfolio_content', {}).get('gallery_images', [])
    
    image_found = False
    new_gallery_images = []
    removed_image_filename = None
    for img in gallery_images:
        if img['filename'] == filename_to_remove:
            image_found = True
            removed_image_filename = img['filename']
            try:
                physical_file_path = os.path.join(app.config['UPLOAD_FOLDER_PHYSICAL'], removed_image_filename)
                if os.path.exists(physical_file_path):
                    os.remove(physical_file_path)
                else:
                    flash(f"Arquivo físico '{removed_image_filename}' não encontrado no servidor, mas a referência será removida.", 'warning')
            except OSError as e:
                flash(f"Erro ao remover o arquivo físico '{removed_image_filename}': {e}. A referência ainda será removida.", 'danger')
        else:
            new_gallery_images.append(img)

    if image_found:
        data['portfolio_content']['gallery_images'] = new_gallery_images
        save_data(data)
        flash(f"Imagem '{filename_to_remove}' e sua referência foram removidas com sucesso!", 'success')
    else:
        flash(f"Referência da imagem '{filename_to_remove}' não encontrada nos dados.", 'warning')
        
    return redirect(url_for('admin_dashboard'))


@app.route('/admin/update_password', methods=['POST'])
def admin_update_password():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    current_password = request.form.get('current_password')
    new_password = request.form.get('new_password')
    confirm_new_password = request.form.get('confirm_new_password')

    if not all([current_password, new_password, confirm_new_password]):
        flash('Todos os campos de senha são obrigatórios.', 'warning')
        return redirect(url_for('admin_dashboard'))

    if new_password != confirm_new_password:
        flash('A nova senha e a confirmação não coincidem.', 'danger')
        return redirect(url_for('admin_dashboard'))

    data = load_data()
    admin_credentials = data.get('credentials', {})

    if check_password_hash(admin_credentials.get('password', ''), current_password):
        admin_credentials['password'] = generate_password_hash(new_password)
        data['credentials'] = admin_credentials
        save_data(data)
        flash('Senha atualizada com sucesso!', 'success')
    else:
        flash('Senha atual incorreta.', 'danger')

    return redirect(url_for('admin_dashboard'))


if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER_PHYSICAL']):
        os.makedirs(app.config['UPLOAD_FOLDER_PHYSICAL'])
    
    load_data()
    app.run(debug=True)