import { TTeamLogo } from "@/lib/types"
import Image from "next/image"

const TeamLogo = ({ src, alt, size = 32, className }: TTeamLogo) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className ?? "object-contain flex-shrink-0"}
    />
  )
}

export default TeamLogo
