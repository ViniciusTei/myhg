import Icon from "./ui/icon";

export default function FullPageLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Icon icon="semi-circle" size={40} className="animate-spin" />
    </div>
  )
}
