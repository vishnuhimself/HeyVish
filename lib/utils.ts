import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / perPage)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  
  const offset = (currentPage - 1) * perPage
  const paginatedItems = items.slice(offset, offset + perPage)

  return {
    items: paginatedItems,
    pageCount: totalPages,
    currentPage,
  }
}
