import { useState } from 'react'

import viteLogo from '/vite.svg'
import './App.css'
import Lottie from 'lottie-react'
import animationData from "./animations/cube.json"
import pickachuData from "./animations/pickachu.json"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import AccordionDemo from "./myComponents/AccordionDemo"
import DialogDemo from "./myComponents/DialogDemo"
import MyForm from "./myComponents/MyForm"
import MyModal from "./myComponents/MyModal"
function App() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);


  return (
    <>
      <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>

<AccordionDemo/>
<MyForm/>
<MyModal/>
<Lottie animationData = {animationData} />
<Lottie animationData = {pickachuData} />

    </>
  )
}

export default App
