import styled from "styled-components";

export const Container = styled.div`
  background: ${props => props.theme.colors.question.bg};
  // background: #27272b;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0,0, 0.04);
  padding:24px;

  & + .question {
    margin-top: 8px;
  }

  &.answered {
    background: ${props => props.theme.colors.question.answeredBg};
    // background: #0c0c0d;

  }

  &.highlighted {
    background-color: ${props => props.theme.colors.question.highlightedBg};
    // background-color: #2f2052;
    border: 1px solid #835afd;

    svg path {
      stroke: #835afd;
    }

    
  }

  p {
    color: ${(props) => props.theme.colors.text};

  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    .user-info {
      display: flex;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;

      }

      > span {
        margin-left: 8px;
        color: ${props => props.theme.colors.text};
        filter:brightness(0.7);
        font-size: 14px;
      }
    }

    > div {
      display: flex;
      gap: 10px;
    }

    button {
      border: 0;
      background: transparent;
      cursor: pointer;

      &.like-button {
        display: flex;
        align-items: flex-end;
        color: #737380;
        gap: 8px;

        &.liked {
          color: #835afd;

          svg path {
            stroke: #835afd;
          }
        }
      }

      &:hover {
        filter: brightness(1.5);
      }
    }
  }

`