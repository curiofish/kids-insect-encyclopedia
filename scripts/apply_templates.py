import os
import re
from bs4 import BeautifulSoup

def read_template(template_path):
    with open(template_path, 'r', encoding='utf-8') as f:
        return f.read()

def apply_templates_to_html(html_path, header_template, footer_template):
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    
    # 기존 헤더와 푸터 제거
    if soup.header:
        soup.header.decompose()
    if soup.footer:
        soup.footer.decompose()
    
    # body 태그 찾기
    body = soup.body
    if not body:
        return
    
    # 헤더 삽입
    header_soup = BeautifulSoup(header_template, 'html.parser')
    body.insert(0, header_soup)
    
    # 푸터 삽입
    footer_soup = BeautifulSoup(footer_template, 'html.parser')
    body.append(footer_soup)
    
    # 파일 저장
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))

def main():
    # 템플릿 읽기
    header_template = read_template('templates/header.html')
    footer_template = read_template('templates/footer.html')
    
    # HTML 파일 찾기
    html_files = []
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in root or '.git' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    # 각 HTML 파일에 템플릿 적용
    for html_file in html_files:
        print(f'Applying templates to {html_file}')
        apply_templates_to_html(html_file, header_template, footer_template)

if __name__ == '__main__':
    main() 