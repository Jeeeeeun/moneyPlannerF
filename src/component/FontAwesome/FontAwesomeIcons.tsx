import {
  faAnglesLeft,
  faAnglesRight,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// type Props = {
//   valid: boolean | null;
// }

// function ValidIcon({valid}: Props) { // sign up 유효성검사 통과 아이콘
//   let icon;
//   let color;

//   if (valid === true) {
//     icon = faCheck;
//     color = `#03c03c`;
//   } else if (valid === false) {
//     icon = faXmark;
//     color = `red`;
//   } else {
//     icon = faCheck;
//     color = `gray`;
//   }

//   return (
//     <FontAwesomeIcon icon={icon} style={{color: color}} />
//   );
// }

function OpenMenu() {
  // 홈화면 메뉴 아이콘 ≡
  const icon = faBars;
  const color = `#7fa4b2`;
  const fontSize = `1.3em`;
  const fontWeight = `900`;

  return (
    <FontAwesomeIcon
      icon={icon}
      style={{ color, fontSize, fontWeight }}
    ></FontAwesomeIcon>
  );
}

function CloseRightMenu({
  onMenuClick,
  className,
  style,
}: {
  onMenuClick: () => void;
  className?: string;
  style?: object;
}) {
  // slide 메뉴 닫기 아이콘 >>
  const icon = faAnglesRight;

  return (
    <FontAwesomeIcon
      icon={icon}
      style={style}
      onClick={onMenuClick}
      className={className}
    />
  );
}

function CloseLeftMenu({
  onMenuClick,
  className,
  style,
}: {
  onMenuClick: () => void;
  className?: string;
  style?: object;
}) {
  // slide 메뉴 닫기 아이콘 <<
  const icon = faAnglesLeft;

  return (
    <FontAwesomeIcon
      icon={icon}
      style={style}
      onClick={onMenuClick}
      className={className}
    />
  );
}

export { CloseLeftMenu, CloseRightMenu, OpenMenu };
