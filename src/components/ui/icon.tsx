"use client"

import { IconBaseProps } from "react-icons";
import { PiCircleNotchThin } from "react-icons/pi";

interface IconProps extends IconBaseProps {
  icon: 'semi-circle'
}

export default function Icon({ icon, ...props }: IconProps) {
  switch (icon) {
    case 'semi-circle':
      return <PiCircleNotchThin {...props} />
    default:
      console.log(`Icon ${icon} not implemented!`)
      return null
  }
}
