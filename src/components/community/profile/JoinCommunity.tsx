import styled from "styled-components";
import { media } from "../../../api/util/Media";

const JoinCommunity = styled.button`
    background-color: #bf1d48;
    border: none;
    border-radius: 4px;

    ${media(`font-size: 12px;`, `font-size: 16px;`, `font-size: 16px;`)}
`

export default JoinCommunity