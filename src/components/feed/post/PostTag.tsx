import styled from "styled-components";

const PostTag = styled.button`
    background-color: #${({ theme }) => theme.accessory};
    padding-right: 16px;
    padding-left: 16px;
    border: none;
    border-radius: 16px;
    padding-top: 2px;
    padding-bottom: 2px;
`

export default PostTag;