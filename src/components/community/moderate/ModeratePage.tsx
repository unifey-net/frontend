import styled from "styled-components"
import { media } from "../../../api/util/Media"

const ModeratePage = styled.div`
    ${media("", "min-width: 300px;", "min-width: 600px;")}

    .settings-cluster {
        .cluster-title {
            font-size: 24px;
        }

        .cluster-items {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        margin-top: 16px;
        margin-bottom: 16px;
    }

    ul {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
`

export default ModeratePage
