import styled from "styled-components";

const PostTag = styled.button`
    background-color: #${({ theme }) => theme.accessory};
    
    padding-right: 16px;
    padding-left: 16px;
    padding-top: 2px;
    padding-bottom: 2px;

    border: none;
    border-radius: 16px;

    color: black;
`

export default PostTag;