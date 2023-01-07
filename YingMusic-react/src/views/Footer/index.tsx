import React from "react";
import "./style.module.scss";

const Footer: React.FC = () => {
  return (
    <footer>
      <p>
        本项目仅供个人学习研究使用，禁止用于商业及非法用途。 基于
        <a href="https://opensource.org/licenses/MIT" target="_blank">
          MIT license
        </a>
        许可进行开源。
      </p>
      <p>
        <a href="https://github.com/KyrieWu/YingMusic-react" target="_blank">
          GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
