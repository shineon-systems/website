export type Article = {
  slug: string,
  title: string,
  desc: string,
  date: string,
  body: string,
  imgs: string[]
}

export type Sensor = {
  name: string,
  unit: string,
  value: string
}

export type Device = {
  id: string,
  sensors: Sensor[]
}

export type FarmData = {
  name: string,
  desc: string,
  img: string,
  sheetID: string,
  link: string,
  date: Date,
  devices: Device[]
}