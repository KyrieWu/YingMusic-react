import React from "react";
import { useTranslation } from "react-i18next";
import "./style.module.scss";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <p>{t("footer.footerText")}</p>
      <p>
        <a href="https://github.com/KyrieWu/YingMusic-react" target="_blank">
          GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
