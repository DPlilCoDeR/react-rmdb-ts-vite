//helpers
import { FunctionComponent } from "react";
import { calcTime , convertMoney } from "../../helpers";

//Styles
import { Column, Content, Wrapper } from "./MovieInfoBar.styles";

interface MovieInfoBarProps {
    time: number,
    budget: number,
    revenue: number
}

const MovieInfoBar: FunctionComponent<MovieInfoBarProps> = ({time, budget, revenue}) => (
    <Wrapper>
        <Content>
            <Column>
                <p>Runnig Time: {calcTime(time)}</p>
            </Column>
            <Column>
                <p>Budget: {convertMoney(budget)}</p>
            </Column>
            <Column>
                <p>Revenue: {convertMoney(revenue)}</p>
            </Column>

        </Content>
    </Wrapper>
);


export default MovieInfoBar;