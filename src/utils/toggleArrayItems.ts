export const toggleArrayItems = (
  currentArray: number[],
  itemsToToggle: number[]
): number[] => {
  const set = new Set(currentArray)

  itemsToToggle.forEach((id) => {
    if (set.has(id)) {
      set.delete(id)
    } else {
      set.add(id)
    }
  })

  return [...set]
}
