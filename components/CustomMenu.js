import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button
} from '@material-tailwind/react'
import Link from 'next/link'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export function CustomMenu(props) {
  return (
    <Menu
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 }
      }}
      placement="bottom-start"
    >
      <MenuHandler>
        <Button
          variant="text"
          className="group w-full flex items-center justify-start px-3 py-2 text-base font-medium text-gray-700 no-underline rounded-lg transition-all duration-300 hover:bg-gray-50 hover:text-indigo-600 focus:text-indigo-600 focus:bg-gray-50 focus:outline-none normal-case"
        >
          <span className="relative">
            {props.data.parentName}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
          </span>
          <ChevronDownIcon
            className="ml-2 h-4 w-4 text-gray-500 group-hover:text-indigo-600 transition-colors duration-300"
            aria-hidden="true"
          />
        </Button>
      </MenuHandler>
      <MenuList className="bg-white border border-gray-200 shadow-lg rounded-lg p-1">
        {props.data.children.map((child, index) => (
          <Link href={child.childUrl} key={index}>
            <MenuItem className="text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md transition-all duration-300 px-3 py-2 text-sm font-medium">
              {child.childName}
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  )
}
