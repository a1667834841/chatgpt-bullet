import { createEffect, createSignal, For, onCleanup, onMount } from "solid-js"
import type { PromptItem } from "./Generator"
import { makeEventListener } from "@solid-primitives/event-listener"

export default function PromptList(props: {
  prompts: PromptItem[]
  select: (k: string) => void
}) {
  let containerRef: HTMLUListElement
  const [hoverIndex, setHoverIndex] = createSignal(0)
  const [maxHeight, setMaxHeight] = createSignal("320px")

  createEffect(() => {
    if (hoverIndex() < 0) {
      setHoverIndex(0)
    } else if (hoverIndex() && hoverIndex() >= props.prompts.length) {
      setHoverIndex(props.prompts.length - 1)
    }
  })

  createEffect(() => {
    if (containerRef && props.prompts.length)
      setMaxHeight(
        `${
          window.innerHeight - containerRef.clientHeight > 112
            ? 320
            : window.innerHeight - 112
        }px`
      )
  })

  onMount(() => {
    makeEventListener(
      window,
      "keydown",
      e => {
        if (e.key === "ArrowDown") {
          setHoverIndex(hoverIndex() + 1)
        } else if (e.key === "ArrowUp") {
          setHoverIndex(hoverIndex() - 1)
        } else if (e.key === "Enter") {
          props.select(props.prompts[hoverIndex()].prompt)
        }
      },
      { passive: true }
    )
  })

  return (
    <div id="popup" class="popup"  style={{
      "position": "fixed",
      "z-index": 11,
      "left": 0,
      "top": "10%",
      "right": 0,
      
      "margin":"0 auto",
      "width": "90%",
      "height": "80%",
      "overflow": "auto",
      "background-color": "rgba(0,0,0,0.9)"
    }}>
      {/* <input type="text" placeholder="输入内容"></input> */}
    <ul
      ref={containerRef!}
      class="bg-slate bg-op-15 text-white text-3xl font-bold overflow-y-auto rounded-t grid gap-4 grid-cols-2"
      style={{
        "position": "fixed",
        "top": "10%",
        // "max-height": maxHeight(),
        "height": "80%",
        "width": "90%",
        "margin": "0 10"
      }}
    >
      <For each={props.prompts}>
        {(prompt, i) => (
          <Item
            prompt={prompt}
            select={props.select}
            hover={hoverIndex() === i()}
          />
        )}
      </For>
    </ul>
    </div>

  )
}

function Item(props: {
  prompt: PromptItem
  select: (k: string) => void
  hover: boolean
}) {
  let ref: HTMLLIElement
  createEffect(() => {
    if (props.hover) {
      ref.focus()
      ref.scrollIntoView({ block: "center" })
    }
  })
  return (
    <li
      ref={ref!}
      class="hover:bg-slate hover:bg-op-20 py-1 px-3"
      classList={{
        "bg-slate": props.hover,
        "bg-op-20": props.hover
      }}
      onClick={() => {
        props.select(props.prompt.prompt)
      }}
    >
      <p>{props.prompt.desc}</p>
      <p class="text-0.4em">{props.prompt.prompt}</p>
    </li>
  )
}
