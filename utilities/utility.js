export const shortenText = (inputString, len = 200) => {
  return inputString.slice(0, len)
}

export const downloadFile = (fileName, parentFolder = 'documents') => {
  const filePath = parentFolder.concat('/', fileName)
}
