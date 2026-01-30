import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { userorders } from "@/interfaces"

type Props = {
  orderitems:any[]
}

export function DropdownMenuDemo({orderitems}:Props) {
  return (
    
  <DropdownMenu>
<DropdownMenuTrigger asChild>
  <Button 
    variant="outline"
    className="
      w-auto px-4 py-2
      rounded-lg
      border
      transition-colors
      hover:bg-primary/10
      hover:text-primary
      hover:border-primary
      focus-visible:ring-0 cursor-pointer
    "
  >
    View Order Items
  </Button>
</DropdownMenuTrigger>

  <DropdownMenuContent 
     align="start"
  className="
    w-[320px] max-h-[420px] overflow-y-auto
    rounded-2xl p-3
    origin-top-right

    animate-in
    fade-in-0
    zoom-in-95
    duration-200
  "
  >
    {/* ===== Title ===== */}
    <DropdownMenuLabel className="px-2 pb-2 text-base font-semibold">
      Order Items
    </DropdownMenuLabel>

    <DropdownMenuGroup className="space-y-2">
      {orderitems.map((items) => (
        <DropdownMenuItem
          key={items._id}
          className="
            flex items-start gap-3
            rounded-xl p-3
            hover:bg-muted
            focus:bg-muted
            cursor-pointer
          "
        >
          {/* ===== Image ===== */}
          <div className="relative h-20 w-20 flex-shrink- overflow-hidden rounded-xl">
            <img
              src={items.product.imageCover}
              alt={items.product.title}
              className="
                h-full w-full object-cover
                transition-transform duration-300
                hover:scale-110
              "
            />
          </div>

          {/* ===== Content ===== */}
          <div className="flex flex-1 flex-col gap-1">
            {/* Title */}
            <p className="line-clamp-2 text-sm font-medium">
              {items.product.title}
            </p>

            {/* Quantity */}
            <span className="text-xs text-muted-foreground">
              Quantity: {items.count}
            </span>

            {/* Price */}
            <span className="text-sm font-semibold text-green-600">
              {items.price} EGP
            </span>
          </div>
        </DropdownMenuItem>
      ))}
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
  )
}
