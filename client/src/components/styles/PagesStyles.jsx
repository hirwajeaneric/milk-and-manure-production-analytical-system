import styled from 'styled-components';

export const DetailElement = styled.div`
    width: 100%;    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    label {
        font-size: 90%;
        color: gray;
    }

    p {
        color: black;
    }
`;

export const MccInfoContainer = styled.div`
    width: 100%;    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    div.left {
        width: 30%;    
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 10px;
        height: 100%;
    }

    div.right {
        width: 68%;    
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 10px;
    
        div.register-employee {
            width; 100%;
        }

        div.employee-table-container {
            width; 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            background: white;
            padding: 10px;
            gap: 10px;
        }

    }

`;

