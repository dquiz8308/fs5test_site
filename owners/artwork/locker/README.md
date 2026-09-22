# Locker asset folders

Put each owner's non-bowl-game locker images directly in that owner's folder:

- `bailey`, `brycen`, `chris`, `cody`, `david`, `ethan`
- `jordan`, `keith`, `matthew`, `max`, `mike`, `will`

Use descriptive filenames such as `golf-clubs.png` or `old-team-logo-frame.webp`.
During every Netlify build, `npm run build` scans these folders and generates the
personal-items list consumed by the owner locker. Items are alphabetized by filename,
then placed in the next available locker shelf slot; extra items add shelves automatically.

Large or hanging pieces use the two-row open display bay beside the locker’s half
shelves. Add one of these words to the filename to opt in: `oversize`, `poster`,
`shirt`, `jersey`, `jacket`, `guitar`, `bass`, `bat`, `club`, `clubs`, `hanger`,
`banner`, or `flag`. The first such item for an owner uses that bay; additional
items continue onto full shelves.

Supported files: PNG, JPG, JPEG, WEBP, GIF, and SVG. Bowl-game trophies stay in
`bowl game trophies` and continue to be sourced from the verified bowl-awards data.
