# Content plan: CMMC Level 2 and DIB security questions

Twenty practitioner questions that people put to ChatGPT, Perplexity, Claude, Google AI Mode, and Copilot about CMMC Level 2 and running a security program in the defense industrial base. Each entry has a suggested slug, the query phrasing to aim at, a question-shaped outline, the primary sources to cite, the first-hand experience that would make the post worth citing, and a confidentiality rating. The writing is yours; nothing here is draft prose.

Written October 18, 2026. CMMC policy moved fast in 2026: the DoW CIO suspended advancement to Phase 2 on July 13, 2026, and the CMMC Reform Task Force was due to report in the fall. Check the current status of anything that depends on the rollout schedule before publishing.

## How to make a post citable

- **Answer first.** Put the direct answer in the `bluf` field (two or three sentences) and in the first paragraph. Engines lift opening passages.
- **Question-shaped `##` headings** that match how people ask, each followed by a one or two sentence answer before any nuance.
- **Specific numbers and named sources**: point values, day counts, section numbers, memo dates. List them in the `sources` field so they render and become `citation` data.
- **First-hand detail**, written as "I did X, and here is what happened", in generic terms. This is what separates your post from vendor content that restates the rule.
- **A short `faq`** for the two or three follow-up questions people ask next.
- **Tags** that put the post on the `/cmmc/` hub: `CMMC`, `NIST 800-171`, `DFARS`, `CUI`, `SPRS`, `C3PAO`, or `DIB`.
- **Run the pre-publish check** already in the post template. Nothing traceable to a client or employer engagement.

## Confidentiality ratings

- **Low**: public rules and your own general practice. Safe to write as planned.
- **Check**: the obvious first-hand example comes from a specific employer or engagement. Write it as a composite or a pattern, with no system names, vendors, dates, scores, or anything a reader could tie to Fiber Materials, a client, or an A-LIGN engagement.
- **High**: touches your employer's business directly, assessment methodology, classified programs, or real incidents. Decide whether to write it at all, and check A-LIGN's policy on public writing and outside activities before you do.

## Summary

| # | Topic | Slug | Confidentiality |
| --- | --- | --- | --- |
| 1 | Scoping a CUI enclave | `cmmc-cui-enclave-scoping` | Check |
| 2 | How the SPRS score is calculated | `sprs-score-nist-800-171-explained` | Low |
| 3 | POA&M rules and the 180-day closeout | `cmmc-poam-rules-180-days` | Low |
| 4 | External service providers and FedRAMP equivalency | `cmmc-external-service-providers-fedramp-equivalency` | Check |
| 5 | GCC High, GCC, or commercial Microsoft 365 | `gcc-high-vs-gcc-vs-commercial-cmmc` | Check |
| 6 | Level 2 self-assessment versus C3PAO assessment | `cmmc-level-2-self-assessment-vs-c3pao` | High |
| 7 | What the July 2026 Phase 2 suspension changed | `cmmc-phase-2-suspension-what-changed` | Check |
| 8 | What assessors look for in evidence | `what-cmmc-assessors-look-for-in-evidence` | High |
| 9 | What a System Security Plan must contain | `cmmc-system-security-plan-what-to-include` | Low |
| 10 | FCI or CUI, and Level 1 or Level 2 | `fci-vs-cui-cmmc-level-1-or-2` | Low |
| 11 | Specialized assets and OT on a manufacturing floor | `cmmc-specialized-assets-ot-manufacturing` | Check |
| 12 | FIPS-validated cryptography (3.13.11) | `fips-validated-cryptography-cmmc-3-13-11` | Low |
| 13 | MFA requirements (3.5.3) | `cmmc-mfa-requirements-3-5-3` | Low |
| 14 | DFARS 7012 72-hour incident reporting | `dfars-7012-72-hour-incident-reporting` | Check |
| 15 | Security protection assets: are your SIEM and EDR in scope? | `security-protection-assets-cmmc-scope` | Low |
| 16 | What the annual affirmation commits you to | `cmmc-annual-affirmation-senior-official` | Low |
| 17 | NIST SP 800-171 Rev. 2 or Rev. 3 | `nist-800-171-rev-2-vs-rev-3-cmmc` | Low |
| 18 | Audit logging requirements and retention | `nist-800-171-audit-logging-requirements` | Low |
| 19 | How long readiness takes, from gap assessment to assessment | `cmmc-level-2-readiness-timeline` | High |
| 20 | DCSA RMF for classified systems versus CMMC | `dcsa-rmf-vs-cmmc` | High |

Your draft "Why CMMC Scoping Is Where Most Programs Quietly Fail" overlaps topic 1. Either fold the scoping mechanics into it or keep it as the opinion piece and link to a separate how-to.

## Topics

### 1. Scoping a CUI enclave

- **Slug:** `cmmc-cui-enclave-scoping`
- **Target queries:** "how to scope a CUI enclave for CMMC", "CMMC enclave vs whole company", "what is in scope for CMMC Level 2"
- **Outline:**
  - What is a CUI enclave, and when is it cheaper than scoping the whole company?
  - Which assets are in scope under the CMMC asset categories?
  - How do security protection assets and contractor risk managed assets change the boundary?
  - What usually breaks an enclave in practice (shared identity, email, file sync, admin workstations, backups)?
  - How do you document the boundary so an assessor can follow it?
- **Primary sources:** 32 CFR 170.19 (CMMC scoping); DoD CIO CMMC Scoping Guide, Level 2; NIST SP 800-171 Rev. 2; DFARS 252.204-7012.
- **First-hand experience:** the scoping decision that moved your boundary the most as an ISSM, described generically (for example, pulling engineering file shares into the enclave), what it cost, and what you would decide differently now.
- **Confidentiality:** Check. Describe the pattern, not a specific architecture.

### 2. How the SPRS score is calculated

- **Slug:** `sprs-score-nist-800-171-explained`
- **Target queries:** "how is SPRS score calculated", "what is a good SPRS score", "why is my SPRS score negative"
- **Outline:**
  - What is the SPRS score, and who has to post one?
  - How does the DoD Assessment Methodology weight each requirement at 5, 3, or 1 point?
  - Why can the score fall as low as -203?
  - Where does partial credit apply (3.5.3 MFA and 3.13.11 encryption)?
  - Why can't you score at all without a System Security Plan?
  - How does the CMMC scoring methodology line up with the SPRS method?
- **Primary sources:** NIST SP 800-171 DoD Assessment Methodology, Version 1.2.1; DFARS 252.204-7019 and 252.204-7020; 32 CFR 170.24 (CMMC Scoring Methodology).
- **First-hand experience:** how you calculated and defended a score as an ISSM, and the scoring mistakes you see most often, kept general.
- **Confidentiality:** Low. Never use a real organization's score.

### 3. POA&M rules and the 180-day closeout

- **Slug:** `cmmc-poam-rules-180-days`
- **Target queries:** "CMMC POA&M rules", "can I have a POA&M for CMMC Level 2", "CMMC conditional status 180 days"
- **Outline:**
  - When does CMMC allow a POA&M at all?
  - What minimum score is required (a ratio of at least 0.8, which is 88 of 110)?
  - Which requirements can never be on a POA&M (any worth more than one point, except the 3.13.11 case where encryption is used but not FIPS-validated, plus six specific requirements the rule names, including the SSP)?
  - What happens at the closeout assessment, and what if you miss 180 days?
  - How is this different from a POA&M under DFARS 7012 alone?
- **Primary sources:** 32 CFR 170.21 (Plan of Action and Milestones requirements); 32 CFR 170.16 and 170.17 (conditional status); CMMC Assessment Guide, Level 2.
- **First-hand experience:** how you ordered remediation to clear the threshold, and which items were hardest to close.
- **Confidentiality:** Low.

### 4. External service providers and FedRAMP equivalency

- **Slug:** `cmmc-external-service-providers-fedramp-equivalency`
- **Target queries:** "does my MSP need CMMC", "FedRAMP moderate equivalent CMMC", "CMMC external service provider requirements"
- **Outline:**
  - What counts as an external service provider under the CMMC rule?
  - When must a cloud service offering be FedRAMP Moderate or equivalent?
  - What did the December 2023 DoD CIO equivalency memo require?
  - How are non-cloud providers such as MSPs and MSSPs handled in your assessment?
  - What belongs in a customer responsibility matrix, and what do you ask a provider for?
- **Primary sources:** DFARS 252.204-7012(b)(2)(ii)(D); DoD CIO memorandum "Federal Risk and Authorization Management Program Moderate Equivalency for Cloud Service Provider's Cloud Service Offerings" (December 21, 2023); 32 CFR 170.4 (definitions) and 170.19; the FedRAMP Marketplace.
- **First-hand experience:** you have been on both sides, at an MSSP serving about 100 clients and later managing vendors as an ISSM. Explain what providers can and cannot hand you.
- **Confidentiality:** Check. Do not name vendors used by an employer or a client.

### 5. GCC High, GCC, or commercial Microsoft 365

- **Slug:** `gcc-high-vs-gcc-vs-commercial-cmmc`
- **Target queries:** "do I need GCC High for CMMC", "GCC vs GCC High CMMC Level 2", "Microsoft 365 commercial CMMC"
- **Outline:**
  - What do DFARS 7012 and export control rules actually require of an email and file platform?
  - How do Commercial, GCC, and GCC High differ on FedRAMP authorization, DFARS 7012 (c) through (g) support, US-person access, and export-controlled data?
  - When is GCC enough, and when is GCC High warranted?
  - What does a migration really involve (licensing, tenant cutover, reseller requirements)?
  - Can a GCC High enclave sit alongside a commercial tenant?
- **Primary sources:** DFARS 252.204-7012(b)(2)(ii)(D) and (c) through (g); ITAR (22 CFR Parts 120 to 130) and the EAR (15 CFR Parts 730 to 774); Microsoft's published FedRAMP and DFARS compliance documentation; the DoD CIO FedRAMP equivalency memo.
- **First-hand experience:** the tenant decision you worked through, described as the questions you had to answer rather than the answer your employer chose.
- **Confidentiality:** Check.

### 6. Level 2 self-assessment versus C3PAO assessment

- **Slug:** `cmmc-level-2-self-assessment-vs-c3pao`
- **Target queries:** "CMMC level 2 self assessment or C3PAO", "do I need a third party CMMC assessment", "CMMC level 2 self assessment requirements"
- **Outline:**
  - How does a solicitation tell you which assessment you need?
  - What does a Level 2 self-assessment involve (SPRS posting, affirmation, a three-year cycle with annual affirmations)?
  - What does a C3PAO certification assessment involve, and how long is the certificate valid?
  - What did the July 2026 Phase 2 suspension change about which one you will be asked for?
  - What evidence should you have either way?
- **Primary sources:** 32 CFR 170.16 and 170.17; DFARS 252.204-7021 and 252.204-7025; DoW CIO memorandum "Removing Barriers to Defense Industrial Base Expansion" (July 13, 2026) and the USD(A&S) implementation memo; DFARS Class Deviation 2026-O0025.
- **First-hand experience:** you have prepared an organization for a C3PAO assessment and now run assessments.
- **Confidentiality:** High. A-LIGN sells assessments, so a post that leans toward "get a C3PAO assessment anyway" can read as marketing for your employer. Keep it strictly factual or skip it.

### 7. What the July 2026 Phase 2 suspension changed

- **Slug:** `cmmc-phase-2-suspension-what-changed`
- **Target queries:** "CMMC phase 2 suspended", "is CMMC delayed", "what still applies after CMMC suspension"
- **Outline:**
  - What did the July 13, 2026 memos suspend, and what did they leave in force?
  - Do DFARS 7012, NIST SP 800-171, SPRS scores, and annual affirmations still apply? (They do.)
  - What happens to solicitations and contracts that already carry a Level 2 (C3PAO) requirement?
  - What did DFARS Class Deviation 2026-O0025 add, and what is still unsettled?
  - Why the work itself does not change for a contractor handling CUI.
- **Primary sources:** the two July 13, 2026 memoranda (DoW CIO and USD(A&S)); DFARS Class Deviation 2026-O0025 (Revision 3, September 3, 2026); 32 CFR Part 170; DFARS 252.204-7012. Add the Reform Task Force's findings once they are published.
- **First-hand experience:** what contractors are actually asking right now, in aggregate.
- **Confidentiality:** Check. Do not characterize A-LIGN's position or any client's plans.

### 8. What assessors look for in evidence

- **Slug:** `what-cmmc-assessors-look-for-in-evidence`
- **Target queries:** "what evidence do CMMC assessors look for", "CMMC evidence examples", "how to prepare evidence for a CMMC assessment"
- **Outline:**
  - What are the examine, interview, and test methods?
  - How do the assessment objectives in NIST SP 800-171A map to evidence?
  - What makes evidence adequate and sufficient?
  - Which artifacts fail most often (an SSP that describes intent, undated screenshots, policies without procedures)?
  - How should an evidence package be organized?
- **Primary sources:** NIST SP 800-171A; CMMC Assessment Guide, Level 2; The Cyber AB's CMMC Assessment Process (CAP).
- **First-hand experience:** this is your strongest angle, because you have assembled evidence as an ISSM and reviewed it as an assessor.
- **Confidentiality:** High. It must not draw on any client engagement, even anonymized, and your employer may have a view on assessors publishing methodology. Check first.

### 9. What a System Security Plan must contain

- **Slug:** `cmmc-system-security-plan-what-to-include`
- **Target queries:** "what should a system security plan include for CMMC", "NIST 800-171 SSP requirements", "SSP template CMMC"
- **Outline:**
  - What does requirement 3.12.4 actually require?
  - What must the SSP describe (boundary, environment, how each requirement is met, connections to other systems)?
  - How detailed should each implementation statement be?
  - Why can't the SSP go on a POA&M?
  - How do you keep it accurate after the assessment?
- **Primary sources:** NIST SP 800-171 Rev. 2, requirement 3.12.4; NIST SP 800-18 (guide for developing security plans); 32 CFR 170.21; CMMC Assessment Guide, Level 2.
- **First-hand experience:** what you learned writing an SSP from nothing, and which sections took longest.
- **Confidentiality:** Low.

### 10. FCI or CUI, and Level 1 or Level 2

- **Slug:** `fci-vs-cui-cmmc-level-1-or-2`
- **Target queries:** "FCI vs CUI", "do I need CMMC level 1 or level 2", "how do I know if I have CUI"
- **Outline:**
  - What is Federal Contract Information, and what is CUI?
  - How do you identify CUI (markings, contract clauses, CDRLs, the CUI Registry)?
  - What should you do when the government did not mark something that looks like CUI?
  - How does the answer set your CMMC level?
  - What does Level 1 require (the 15 FAR 52.204-21 requirements and an annual affirmation)?
- **Primary sources:** 32 CFR Part 2002 (CUI program); DoDI 5200.48; the NARA CUI Registry; FAR 52.204-21; 32 CFR 170.15; DFARS 252.204-7012.
- **First-hand experience:** how a manufacturer actually finds its CUI (drawings, specifications, export-controlled data), in general terms.
- **Confidentiality:** Low.

### 11. Specialized assets and OT on a manufacturing floor

- **Slug:** `cmmc-specialized-assets-ot-manufacturing`
- **Target queries:** "CMMC specialized assets", "CMMC OT manufacturing", "how to handle CNC machines CMMC"
- **Outline:**
  - What are specialized assets, and what do you have to document for them?
  - How do you protect equipment that cannot run EDR or be patched?
  - What does segmentation look like on a real shop floor?
  - What do assessors expect to see for specialized assets?
- **Primary sources:** 32 CFR 170.19 (asset categories); CMMC Scoping Guide, Level 2; NIST SP 800-82 Rev. 3 (OT security).
- **First-hand experience:** the constraints of securing production and test equipment at a defense manufacturer.
- **Confidentiality:** Check. No equipment names, network layouts, or processes from a specific facility.

### 12. FIPS-validated cryptography (3.13.11)

- **Slug:** `fips-validated-cryptography-cmmc-3-13-11`
- **Target queries:** "FIPS validated encryption CMMC", "FIPS 140-2 vs 140-3 CMMC", "3.13.11 FIPS"
- **Outline:**
  - What does 3.13.11 require, and what is the difference between validated and compliant?
  - How do you check a module's certificate in the CMVP database?
  - Where does it trip people up (full-disk encryption settings, VPNs, removable media, mobile devices)?
  - How does partial credit work in scoring, and when can it go on a POA&M?
- **Primary sources:** NIST SP 800-171 Rev. 2, requirement 3.13.11; NIST Cryptographic Module Validation Program; FIPS 140-3; the DoD Assessment Methodology; 32 CFR 170.21.
- **First-hand experience:** how you verified validated modules across a fleet.
- **Confidentiality:** Low.

### 13. MFA requirements (3.5.3)

- **Slug:** `cmmc-mfa-requirements-3-5-3`
- **Target queries:** "CMMC MFA requirements", "does CMMC require MFA for all users", "3.5.3 multifactor authentication"
- **Outline:**
  - Which accounts and access paths need MFA (privileged accounts, and network access for everyone)?
  - What counts as a second factor, and what does replay resistance (3.5.4) add?
  - Where are the usual gaps (service accounts, break-glass accounts, VPNs, admin consoles)?
  - How does partial credit work in scoring?
- **Primary sources:** NIST SP 800-171 Rev. 2, requirements 3.5.3 and 3.5.4; NIST SP 800-63B; the DoD Assessment Methodology.
- **First-hand experience:** sourcing and deploying MFA and ITDR as an ISSM.
- **Confidentiality:** Low.

### 14. DFARS 7012 72-hour incident reporting

- **Slug:** `dfars-7012-72-hour-incident-reporting`
- **Target queries:** "DFARS 7012 incident reporting 72 hours", "how to report a cyber incident to DoD", "DIBNet reporting requirements"
- **Outline:**
  - What triggers the 72-hour clock?
  - What do you need before an incident happens (a medium assurance certificate for DIBNet)?
  - What must you preserve, and for how long (images and data for 90 days)?
  - How does this connect to the incident response requirements in NIST SP 800-171 (3.6)?
  - How do you rehearse it?
- **Primary sources:** DFARS 252.204-7012(c) through (g); DIBNet (dibnet.dod.mil); NIST SP 800-171 Rev. 2, family 3.6; NIST SP 800-61.
- **First-hand experience:** incident response across roughly 100 client environments at an MSSP, and building an incident response playbook.
- **Confidentiality:** Check. No real incidents, clients, or timelines.

### 15. Security protection assets: are your SIEM and EDR in scope?

- **Slug:** `security-protection-assets-cmmc-scope`
- **Target queries:** "are security tools in scope for CMMC", "CMMC security protection assets", "is my SIEM in scope for CMMC"
- **Outline:**
  - What is a security protection asset?
  - Are cloud SIEM and EDR consoles in scope, and what is assessed on them?
  - How does an MSSP's SOC fit into your boundary?
  - What evidence do you need for these assets?
- **Primary sources:** 32 CFR 170.19; CMMC Scoping Guide, Level 2; DFARS 252.204-7012(b)(2)(ii)(D) for cloud-hosted tools.
- **First-hand experience:** you have run SIEM, SOAR, and XDR platforms at an MSSP and deployed EDR and SIEM as an ISSM.
- **Confidentiality:** Low. Keep products generic.

### 16. What the annual affirmation commits you to

- **Slug:** `cmmc-annual-affirmation-senior-official`
- **Target queries:** "CMMC affirmation senior official", "CMMC annual affirmation requirements", "False Claims Act CMMC"
- **Outline:**
  - Who is the affirming official, and what exactly are they affirming?
  - When are affirmations due?
  - What legal exposure follows a false affirmation (the False Claims Act and the DOJ Civil Cyber-Fraud Initiative)?
  - What evidence should back each affirmation?
- **Primary sources:** 32 CFR 170.22 (Affirmation); 31 U.S.C. 3729 to 3733 (False Claims Act); DOJ Civil Cyber-Fraud Initiative announcements and settlements.
- **First-hand experience:** reporting cybersecurity risk and compliance status to executive leadership.
- **Confidentiality:** Low. Frame it as general information, not legal advice.

### 17. NIST SP 800-171 Rev. 2 or Rev. 3

- **Slug:** `nist-800-171-rev-2-vs-rev-3-cmmc`
- **Target queries:** "NIST 800-171 rev 2 vs rev 3", "does CMMC use rev 3", "should I implement 800-171 rev 3"
- **Outline:**
  - Which revision does CMMC assess against today?
  - What changed in Rev. 3 (consolidated requirements, organization-defined parameters, new families)?
  - What do the DoD class deviations say?
  - How do you prepare for Rev. 3 without doing the work twice?
- **Primary sources:** NIST SP 800-171 Rev. 2 and Rev. 3 (May 2024); NIST SP 800-171A Rev. 3; 32 CFR 170.2 (incorporation by reference); DFARS Class Deviation 2024-O0013; the DoD memo setting values for Rev. 3 organization-defined parameters (April 2025).
- **First-hand experience:** what Rev. 3 would have changed in the program you built.
- **Confidentiality:** Low.

### 18. Audit logging requirements and retention

- **Slug:** `nist-800-171-audit-logging-requirements`
- **Target queries:** "NIST 800-171 logging requirements", "CMMC log retention", "what audit logs does CMMC require"
- **Outline:**
  - What do requirements 3.3.1 through 3.3.9 require?
  - How long should you keep logs (organization-defined retention, plus the DFARS 7012 preservation duty after an incident)?
  - Do you need a SIEM?
  - How do you prove logs are complete and reviewed?
- **Primary sources:** NIST SP 800-171 Rev. 2, family 3.3; NIST SP 800-92; DFARS 252.204-7012(e).
- **First-hand experience:** the logging verification tool that checked 50 client environments in under 30 seconds, and what it found about logging gaps in general.
- **Confidentiality:** Low.

### 19. How long readiness takes, from gap assessment to assessment

- **Slug:** `cmmc-level-2-readiness-timeline`
- **Target queries:** "how long does CMMC level 2 take", "CMMC readiness timeline", "how much does CMMC level 2 cost"
- **Outline:**
  - What does a realistic timeline look like from gap assessment to assessment?
  - What takes longest (identity, logging, documentation, behavior change)?
  - What staffing and budget should a small contractor expect?
  - What does a readiness assessment cover?
- **Primary sources:** 32 CFR Part 170; the regulatory impact analysis in the October 15, 2024 final rule (89 FR 83092); The Cyber AB's CMMC Assessment Process.
- **First-hand experience:** carrying an organization from gap assessment to C3PAO engagement.
- **Confidentiality:** High. Readiness assessments are part of your employer's business, and your own timeline and budget would identify a former employer. Use ranges and patterns only, or skip it.

### 20. DCSA RMF for classified systems versus CMMC

- **Slug:** `dcsa-rmf-vs-cmmc`
- **Target queries:** "DCSA RMF vs CMMC", "NISPOM vs CMMC", "NIST 800-53 vs 800-171 for contractors"
- **Outline:**
  - Which authority governs each (NISPOM and the DCSA process versus DFARS and CMMC)?
  - How do NIST SP 800-53 and NIST SP 800-171 overlap?
  - Can evidence or processes be reused between the two programs?
  - What changes for the people who run both?
- **Primary sources:** 32 CFR Part 117 (NISPOM); the DCSA Assessment and Authorization Process Manual; NIST SP 800-53 Rev. 5; NIST SP 800-171 Rev. 2.
- **First-hand experience:** few people have run both, which is exactly why this would be cited.
- **Confidentiality:** High. Stay at the level of public policy documents; no program, system, or facility details, and nothing about clearances.
