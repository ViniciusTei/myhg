"use client"

import { IconBaseProps } from "react-icons";
import { PiCircleNotchThin, PiScan, PiPlant, PiAlarm, PiHouseLine, PiGearSixFill, PiPlus } from "react-icons/pi";

interface IconProps extends IconBaseProps {
  icon: 'semi-circle' | 'scan' | 'plant' | 'alarm' | 'site' | 'settings' | 'plus'
}

export default function Icon({ icon, ...props }: IconProps) {
  switch (icon) {
    case 'semi-circle':
      return <PiCircleNotchThin {...props} />
    case 'scan':
      return <PiScan {...props} />
    case 'plant':
      return <PiPlant {...props} />
    case 'alarm':
      return <PiAlarm {...props} />
    case 'site':
      return <PiHouseLine {...props} />
    case 'settings':
      return <PiGearSixFill {...props} />
    case 'plus':
      return <PiPlus {...props} />
    default:
      console.log(`Icon ${icon} not implemented!`)
      return null
  }
}
