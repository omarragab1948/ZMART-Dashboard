import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "./ui/button";
import type { TableAction } from "@/types/table";

type DropMenuProps<T> = {
  items?: (item: T) => TableAction<T>[];
  item: T;
};
const DropMenu = <T,>({ items, item }: DropMenuProps<T>) => {
  const actions = items?.(item);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-lg cursor-pointer">
        <BsThreeDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {actions?.map((action) => (
          <DropdownMenuItem>
            <Button
              variant="ghost"
              onClick={() => action.onClick(item)}
              className={`w-full justify-start gap-2 cursor-pointer ${
                action.title.toLowerCase() === "delete"
                  ? "text-red-600 hover:text-red-600"
                  : ""
              }`}
            >
              {action.icon} {action.title}
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropMenu;
