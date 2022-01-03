import { FunctionComponent } from "react";

//Styles
import { Wrapper } from "./Button.styles";

interface ButtonProps {
    text: string;
    callback: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({text, callback}) => (
    <Wrapper type='button' onClick={callback}>
        {text}
    </Wrapper>
);


export default Button