# Data Model: Hero Section

**Feature**: Hero Section with Video
**Date**: 2025-11-21

## Entities

### 1. Hero Configuration (Hardcoded or Config Object)

Represents the data displayed in the Hero section.

| Field          | Type     | Description     | Value                                                                                   |
| -------------- | -------- | --------------- | --------------------------------------------------------------------------------------- |
| `preTitle`     | string   | Intro text      | "Hi there, I am"                                                                        |
| `name`         | string   | Main heading    | "Viacheslav Danilov, PhD"                                                               |
| `roles`        | string[] | Rotating roles  | ["ML Engineer", "Data Scientist", "Researcher", "Engineering Manager", "MLOps"]         |
| `videoSrc`     | string   | Path to video   | "content/viacheslav-danilov-1.mp4"                                                      |
| `email`        | string   | Contact email   | "mailto:viacheslav.v.danilov@gmail.com"                                                 |
| `phone`        | string   | Contact phone   | "https://wa.me/+34634810041"                                                            |
| `telegram`     | string   | Social handle   | "https://t.me/ballmaske"                                                                |
| `cvLink`       | string   | CV Download URL | "https://drive.google.com/file/d/1jYs54eFCYc367ZKhWjH1Xfry4_sFI7Ir/view?usp=drive_link" |
| `projectsLink` | string   | Portfolio URL   | "https://vdanilov.com/portfolio/"                                                       |
