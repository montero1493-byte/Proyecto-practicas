import { useTranslation } from "react-i18next";

type Language = "es" | "en";

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lang: Language) => {
        i18n.changeLanguage(lang);
    };

    return(
        <select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value as Language)}
        >
            <option value="es">ES</option>
            <option value="en">EN</option>
        </select>
    );
};

export default LanguageSelector;
