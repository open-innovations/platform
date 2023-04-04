---
title: Data Tarn
---

## What is it?

Collection of data derived from openly licensed data sets, processed to make it easy (easier) to
combine and generate economic insight.

The data is managed in a git repo.

Extraction and processing of data is automated.



## Stuff to cover:

* Data model
  * 5NF
  * dimension: [index[], measure], value: numeric (ish)
* On-disk structures
* File formats
  * CSV
  * Parquet
  * etc
* Field / file naming standards
* Standardisation / normalisation of formats
  * handling periodicity - monthly, annual, quarterly date
  * 'low' or suppressed values
  * units - %, m, bn, currency values, seasonal adjustments
  * % of what - baseline
  * categorical / ordered categorical values (e.g. A*-U for A-level)
* Pipleline automation
  * Processing scripts
  * 'Downloading'
* Link to [metadata visualisation](/components/metadata-visualser/)