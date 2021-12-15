import { createGlobalStyle } from "styled-components"
import { ThemeType } from "./Theme"

/**
 * Global style
 */
export default createGlobalStyle<{ theme: ThemeType }>`
    // for notification toasts
    .toast-notification {
        div {
            display: flex;
            flex-direction: row;
            align-items: center;

            .toast-name-column {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
            }

            p {
                color: white;
            }                

            button {
                background-color: transparent;
                border: none;
                cursor: pointer;
            }

            span {
                font-size: 12px;
            }
        }
    }

    body {
        background-color: ${({ theme }) => `${theme.background}`};
    }

    .page-container {
        position: relative;
        min-height: 100vh;
    }

    .content-container {
        padding-bottom: 8rem;
    }

    .footer {
        font-size: 16px;
        font-family: "Poppins", sans-serif;;
        position: absolute;
        bottom: 0;
        width: 100%;
        margin-top: 3rem;
        height: 5rem;
        text-align: center;
    }

    html {
        scrollbar-width: none; /* For Firefox */
        -ms-overflow-style: none; /* For Internet Explorer and Edge */
    }

    html::-webkit-scrollbar {
        width: 0px; /* For Chrome, Safari, and Opera */
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: 600;
        font-family: "Montserrat", sans-serif;
    }

    button {
        font-family: "Poppins", sans-serif !important;
    }

    p,
    a,
    span,
    label {
        font-family:  "Poppins", sans-serif !important;
        font-size: 1rem;
        line-height: 1.5rem;
        color: #969696;
    }

    .ant-btn {
        span {
            color: white !important;
        }
    }

    h2 {
        font-size: 1.125rem;
        line-height: 1.75rem;
    }

    h1 {
        @media (min-width: 1024px) {
            font-size: 3.75rem;
            line-height: 1;
        }

        @media (min-width: 768px) and (max-width: 1024px) {
            font-size: 2.25rem;
            line-height: 2.5rem;
        }

        font-size: 1.25rem;
        line-height: 1.75rem;
    }

    a:hover {
        color: #5b5bdc;
    }

    a {
        color: #5190f5;
    }

    .anticon {
        vertical-align: 0 !important;
    }

    .divider {
        border: #2c2c2c solid 1.5px;
        border-radius: 1px;
    }
    
    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .variable-min-w {
        @media (max-width: 599px) {
            min-width: 12rem;
        }

        @media (min-width: 600px) and (max-width: 1199px) {
            min-width: 36rem;
        }

        @media (min-width: 1200px) {
            min-width: 48rem;
        }
    }

`
