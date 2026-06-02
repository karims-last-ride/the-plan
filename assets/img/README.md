# Image Folder Guide

Place custom site images in this folder.

The site currently avoids broken image references by using styled placeholders
for photos Mason has not added yet. Once an image exists, replace the matching
placeholder in `index.html` with an `<img>` tag.

## Existing Image

```text
assets/img/north-georgia-cabin-hero.png
```

This is a generated, non-identifying cabin/fire-pit hero background. It contains
no people, no private address clues, and no readable text.

## Current Karim Image Set

These files are currently used throughout the page:

```text
assets/img/karim-hero.jpg
assets/img/gigakarim.jpg
assets/img/thumbsupkarim.jpg
assets/img/tposekarim.jpg
assets/img/ahegaokarim.jpg
assets/img/baldkarim.jpg
assets/img/gamingbulgekarim.jpg
assets/img/kascream.jpg
assets/img/mogkarim.jpg
assets/img/nerdkarim.jpg
```

`gigakarim.jpg` is used as the massive feature image. `thumbsupkarim.jpg` is
cropped in CSS where it appears so Karim stays framed instead of getting buried
under empty night sky.

## Recommended Future Filenames

Hero:

```text
assets/img/karim-hero.jpg
```

This filename is already wired into the hero card in `index.html`. Save Karim's
hero portrait with this exact name and the card will show it automatically.

Karim lore:

```text
assets/img/karim-young.jpg
assets/img/karim-roommate-era.jpg
assets/img/karim-funny.jpg
```

Group photos:

```text
assets/img/group-photo-1.jpg
assets/img/group-photo-2.jpg
assets/img/group-photo-3.jpg
```

Cabin/rental screenshots:

```text
assets/img/cabin-option-a.jpg
assets/img/cabin-option-b.jpg
assets/img/cabin-option-c.jpg
```

Post-trip gallery:

```text
assets/img/rage-room.jpg
assets/img/fire-pit.jpg
assets/img/hot-tub.jpg
assets/img/final-group-photo.jpg
```

## How To Replace a Placeholder

Find the placeholder in `index.html`. The comments show the intended image
replacement.

Example:

```html
<img src="assets/img/karim-hero.jpg" alt="Karim celebrating with the group">
```

Use useful alt text that describes the image. Do not use filenames as alt text.

## Photo Safety

This is a public GitHub Pages site. Do not commit photos that include:

- Private addresses or door codes
- License plates
- Payment details
- Anything embarrassing without consent
- Anything explicit or incriminating
- Screenshots that reveal private messages or personal contact info

Keep the site fun, loyal, and public-safe.
