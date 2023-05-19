---
title: Data Tarn
page_authors:
  - cspence
  - gdring
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
  * Provision of an API?
  * etc
* Field / file naming standards, including lookups
* Geographic data
* Hierarchy lookup standards
* Standardisation / normalisation of formats
  * handling periodicity - monthly, annual, quarterly date, rolling quarters
  * 'low' or suppressed values
  * units - %, m, bn, currency values, seasonal adjustments, indices
  * % of what - baseline
  * categorical / ordered categorical values (e.g. A*-U for A-level)
* Pipeline automation
  * Processing scripts
  * 'Downloading'
* Maintenance of meta data (licence, source, last/next update)
* Link to [metadata visualisation](/components/metadata-visualiser/)
