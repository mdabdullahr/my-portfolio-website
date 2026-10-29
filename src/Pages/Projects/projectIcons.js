import { FaLayerGroup } from "react-icons/fa";
import {
  SiElementor,
  SiExpress,
  SiFigma,
  SiFramer,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiSocketdotio,
  SiStripe,
  SiTailwindcss,
  SiVite,
  SiWoocommerce,
  SiWordpress,
} from "react-icons/si";

export const categoryIconMap = {
  wordpress: SiWordpress,
  framer: SiFramer,
  fullstack: FaLayerGroup,
};

const techIconMap = {
  wordpress: SiWordpress,
  elementor: SiElementor,
  "elementor pro": SiElementor,
  woocommerce: SiWoocommerce,
  php: SiPhp,
  mysql: SiMysql,
  framer: SiFramer,
  "framer motion": SiFramer,
  figma: SiFigma,
  react: SiReact,
  "node.js": SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  "tailwind css": SiTailwindcss,
  vite: SiVite,
  "socket.io": SiSocketdotio,
  stripe: SiStripe,
};

export const getTechIcon = (name) => techIconMap[name.trim().toLowerCase()] ?? null;
