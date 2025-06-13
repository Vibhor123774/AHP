import { Breadcrumbs } from '@material-tailwind/react'
import { usePathname } from 'next/navigation'

export default function CustomBreadcrumbs(props) {
  const paths = usePathname()
  const pathNames = paths.split('/').filter((path) => path)
  return (
    <Breadcrumbs className="my-2">
      <a href="/" className="opacity-60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </a>
      {pathNames.map((path, index, pathNames) => {
        let href = `/${pathNames.slice(0, index + 1).join('/')}`
        const pathInCaps = capitalizeFirstLetter(path)
        return (
          <a
            href={href}
            className={
              index == pathNames.length - 1 ? 'opacity-95' : 'opacity-60'
            }
          >
            <span>{pathInCaps}</span>
          </a>
        )
      })}
    </Breadcrumbs>
  )
}

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}
