import { Component } from "react";

//image
import searchIcon from '../../images/search-icon.svg';

//styles
import { Wrapper, Content} from './SearchBar.styles';

type SearchBarProps = {
    setSearchTerm: (searchTerm: string) => void;
}

type SearchBarState = {
    value: string;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
    state = {value: ''};
    timeout: number = 0;

    componentDidUpdate( _prevProps: SearchBarProps, prevState: SearchBarState) {
        if (this.state.value !== prevState.value) {
            const { setSearchTerm } = this.props;

            clearTimeout(this.timeout);

            this.timeout = window.setTimeout(()=>{
                const {value} = this.state;
                setSearchTerm(value);
            }, 500);

        } 
    }

    render() {
        return(
            <Wrapper>
                <Content>
                    <img src={searchIcon} alt='search-icon' />
                    <input type='text' 
                    placeholder='Search Movie'
                    onChange={event => this.setState({value: event.currentTarget.value})}
                    value={this.state.value}
                    />
                </Content>
            </Wrapper>
            );
    };
};


export default SearchBar;