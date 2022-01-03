import styled from "styled-components";


export const Spinner = styled.div`
    border: 5px solid var(--lightGrey);
    border-top: 5px solid var(--medGrey);
    border-radius: 100%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 15px auto;

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;