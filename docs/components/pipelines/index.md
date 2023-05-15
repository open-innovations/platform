---
title: Reproducible Pipelines
authors:
  - gdring
---

## Overview

The platform relies on a moving and transforming data.
We acheive this using reproducible analytical pipelines or RAPs.
You can read more about the general concepts in this
[blog post about RAPs](https://open-innovations.org/blog/2022-09-14-reproducible-analytical-pipelines-reproducible-analytical-pipelines-reproducible-analytical-pipelines).

We break our pipelines into three broad stages

* __Extract__, where raw data is acquired from a open data source or other source system
* __Transform__, where extracted data is cleansed and converted to a consitent form
* __Prepare__, where transformed data is prepared for visualisation or another use

This echoes the well-understood [ETL (Extract, Transform, Load) pattern](https://en.wikipedia.org/wiki/Extract,_transform,_load) pattern of data processing.
The third step is renamed __Prepare__ in recognition that we are not often actually loading into a data store. In principle, this could be a preparation for loading if needed.

## Stages

You can read more about each stage below.

### Extract

The aim of the extract stage is to get a copy of the data from the source - either a published open data source or potentially an operational system.
The source is largely irrelevant, the purpose of this stage is to deal with interfacing as required. This could be:

* Downloading direct from a known URL.
* Scraping a website for a link to the latest dataset and downloading.
* Calling an API (with our without credentials) and storing in an appropriate format.
* Accessing data from an online data store such as a cloud hosted database or spreadsheet. In the past we've accessed data from Airtable, Google Sheets, and many others.
* Retreiving a file from an SSH location, the file having been manually uploaded using SFTP.

We can potentially access any source of data that can be accessed programatically.

While many of the sources of data are already open, some of them may not.
If we're accessing data from an operational system, we may also have access to sensitive personal information.
Consequently, this data will typically be downloaded to a working area which is excluded from git repositories.
This means that we do not inadvertently share raw data.

The _extract_ stage should not alter the data, but rather store the data in the working directory in a format that is as close as possible to the source system.
This means that we can more easily debug data quality issues later in the process.

### Transform

The _transform_ stage is responsible for validating, sanitising and transforming the data produced from the _extract_ stage.
This may take several forms:

1. Performing a check for quality in the incoming data.
   Given the variety of data sources we interact with, we are likely to encounder data quality issues.
   This is an opportunity to check the data is in good shape.
2. Sanitising data to remove personal information.
   We may need to reduce the risk of releasing personally identifiable information by
   converting an address or postcode to a larger geographic area (such as local authority).
   Simiarly we might want to construct one-way hashes of data fields if we need them for later analysis,
   but are not comfortable with the risk of releasing the raw data which might be a person's name or
   email address, or even an ID from the system.
3. Sanitising data might also incorporate reducing the precision of a floating point number, removing
   embedded symbols (e.g. currencies or percentage characters), remapping or removing surpressed values
   or other processing of the input data.
4. Ultimately we will be transforming the data into a form which we can more easily work with.
   This might include allowing us to combine with other data source.
   See [the Data Tarn component](/components/data-tarn/) for more information about this.

A quick note about granularity: we tend to prefer storing data in as close to a row-level as we can.
We can always summarise from this, but it is impossible to reverse this operation.
We may, for purposes of preventing leaks of personal information, choose to summarise by an appropriate dimension.

The data stored here is checked in to the appropriate repository. Ideally we would also capture the following data:

* Data license
* Attribution

### Prepare

The _prepare_ stage is responsible for converting the data into a form that matches the needs of the downstream process.
That might include

* building a [static website](/tech-stack/static-site-generation/),
* publishing an R/Shiny app,
* updating an open data publication.

There are much fewer constraints on this process, as it is difficult to define common processing.

## Implementation considerations

We've found that defining each stage for a given pipeline as a separate script, then [orchestrating these using a tool like DVC](/test-stack/pipeline-orchestration/) is a much more optimal and maintainable process.