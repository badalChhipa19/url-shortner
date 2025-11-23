/**
 * Internal Dependencies.
 */
import "./style.css";

export const Heading = (props) => {
  return (
    <div className="intro">
      <h1 className="intro_heading">{props.heading}</h1>
    </div>
  );
};
