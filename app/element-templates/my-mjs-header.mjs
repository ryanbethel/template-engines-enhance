export default function MyHeader({ html, state }) {
  const { attrs } = state;
  const message = attrs?.message;
  return html`<style>
      h1 {
        font-size: 2.5rem;
        font-weight: 700;
        line-height: 1.2;
        margin: 0 0 1rem;
      }
    </style>
    <h1><slot></slot></h1>
    <p>Message: ${message || "no message"}</p> `;
}
