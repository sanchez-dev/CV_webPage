import { useTranslation } from 'react-i18next';

export const useResumeLink = () => {
  const { i18n } = useTranslation();
  
  const getResumeUrl = () => {
    return i18n.language === 'es' 
      ? '/Content/JoseSanchez_CV_ESP_run@jose.run.pdf'
      : '/Content/JoseSanchez_CV_ENG_run@jose.run.pdf';
  };

  return getResumeUrl();
};