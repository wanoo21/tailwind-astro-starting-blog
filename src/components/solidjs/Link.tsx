export default function Link(props: { href: string, class: string, children: string }) {
  const isInternalLink = props.href && props.href.startsWith('/')
  const isAnchorLink = props.href && props.href.startsWith('#')

  if (isInternalLink || isAnchorLink) {
    return (
      <a href={props.href} class={props.class}>
        {props.children}
      </a>
    )
  }
  return (
    <a href={props.href} class={props.class} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  )
}
