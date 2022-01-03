//styles
import { FunctionComponent } from "react";
import { Wrapper, Content } from "./Grid.styles";

type gridProps = {
    header: string;
}

const Grid: FunctionComponent<gridProps> = ({ header, children }) => (
    <Wrapper>
        <h1>{header}</h1>
        <Content>{children}</Content>
    </Wrapper>
);


export default Grid;