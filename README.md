# Stable Diffusion 스타일 일관성 가이드

이 가이드는 Stable Diffusion을 사용하여 일관된 스타일의 이미지를 생성하는 데 도움을 주는 도구입니다.

## 사용 방법

1. Python 환경에서 가이드 확인:
```python
python sd_style_guide.py
```

2. 코드에서 직접 사용:
```python
from sd_style_guide import STYLE_PROMPT_TEMPLATE, OPTIMAL_PARAMS, IMG2IMG_PARAMS

# 프롬프트 템플릿 사용
positive_prompt = STYLE_PROMPT_TEMPLATE['positive'].format(
    subject_description="a cute cat playing with yarn"
)
negative_prompt = STYLE_PROMPT_TEMPLATE['negative']

# 최적화된 파라미터 사용
params = OPTIMAL_PARAMS
```

## 주요 기능

1. **프롬프트 템플릿**
   - 일관된 스타일을 위한 기본/부정 프롬프트 제공
   - 쉽게 커스터마이즈 가능한 형식

2. **최적화된 파라미터**
   - 이미지 생성을 위한 최적의 설정값 제공
   - steps, cfg_scale, sampler 등 주요 파라미터 포함

3. **LoRA 학습 가이드**
   - 스타일 학습을 위한 단계별 가이드
   - 최적의 학습 파라미터 제공

4. **XY Plot 테스트 가이드**
   - 최적의 파라미터를 찾기 위한 실험 방법 제공
   - 주요 변수 조합에 대한 테스트 방법 설명

## 파일 구조

- `sd_style_guide.py`: 메인 가이드 파일
- `README.md`: 사용 방법 설명

## 업데이트 내역

- 2025-03-09: 초기 버전 작성

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 