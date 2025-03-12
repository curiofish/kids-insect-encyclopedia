import os
from bs4 import BeautifulSoup

def read_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(file_path, content):
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def get_template_content(template_path):
    return read_file(template_path)

def apply_template_to_file(file_path, header_template, footer_template):
    content = read_file(file_path)
    soup = BeautifulSoup(content, 'html.parser')
    
    # 기존 header와 footer 제거
    if soup.header:
        soup.header.decompose()
    if soup.footer:
        soup.footer.decompose()
    
    # body 태그 찾기
    body = soup.body
    if not body:
        return
    
    # header 삽입
    header_soup = BeautifulSoup(header_template, 'html.parser')
    header = header_soup.header
    if header:
        body.insert(0, header)
    
    # footer 삽입
    footer_soup = BeautifulSoup(footer_template, 'html.parser')
    footer = footer_soup.footer
    if footer:
        body.append(footer)
    
    write_file(file_path, str(soup))

def main():
    # 템플릿 파일 읽기
    header_template = get_template_content('templates/header.html')
    footer_template = get_template_content('templates/footer.html')
    
    # HTML 파일 목록 가져오기
    html_files = []
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.html') and not file.startswith('header') and not file.startswith('footer'):
                file_path = os.path.join(root, file)
                html_files.append(file_path)
    
    # 각 HTML 파일에 템플릿 적용
    for file_path in html_files:
        print(f'Applying template to {file_path}...')
        apply_template_to_file(file_path, header_template, footer_template)
        print(f'Done: {file_path}')

if __name__ == '__main__':
    main() 