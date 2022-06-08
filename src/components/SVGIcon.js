import SVGImage from "../assets/feather-sprite.svg";
export default function SVGIcon({ icon }) {
  return (
    <>
      <svg className="feather">
        <use href={`${SVGImage}#${icon}`} />
      </svg>
    </>
  );
}
