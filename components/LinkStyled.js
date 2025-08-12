import styled from "styled-components";
import Link from "next/link";

const LinkStyled = styled(Link)`
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 20px;
    width: 100%;
    display: flex;
    align-items: center;

    &:hover {
        color: gray;
    }
`;

export default LinkStyled;