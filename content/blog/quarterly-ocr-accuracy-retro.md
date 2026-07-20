# Quarterly OCR Accuracy Retro

Many businesses deploy an Optical Character Recognition (OCR) solution to automate data entry, set up a basic verification workflow, and then never think about it again. They assume that if accuracy improves, it will be because the software vendor released an update to the AI.

However, the most significant improvements in OCR accuracy usually come from changing *internal* behaviors, not external software. To achieve this, teams relying on OCR should conduct a Quarterly Accuracy Retrospective.

## Step 1: Sampling the Errors

You cannot improve what you do not measure. During the quarter, the team responsible for verifying OCR output (the "Human Gate") should maintain a simple log of persistent errors.

Instead of just correcting a misread total and moving on, they should note it.
*   *Example Log:* "Vendor X invoices always misread the date." or "Receipts from Field Team B are constantly failing."

## Step 2: The Root Cause Analysis

During the quarterly retro, the team reviews the error log and looks at the original images that caused the failures. The goal is to find the root cause of the bad input.

**Common Discoveries:**
*   **The Hardware Issue:** "Field Team B's receipts are failing because the lens on their shared tablet is deeply scratched." (Action: Replace a $50 tablet camera to save hours of manual data entry).
*   **The Lighting Issue:** "The warehouse shipping labels are failing because they are photographed directly under a harsh spotlight, causing glare on the packing tape." (Action: Move the scanning station 3 feet to the left into diffused light).
*   **The Format Issue:** "Vendor X uses a custom, highly stylized font for their invoice numbers that the AI misinterprets." (Action: Ask Vendor X if they can provide digital PDFs instead of paper, or adjust the regex validation for that specific vendor).

## Step 3: Updating the Playbook

The retro should result in actionable changes to the internal OCR Playbook (SOP). 

If the team discovers that scanning documents against a dark background improves automatic cropping and accuracy, that becomes a new rule. Training is updated, and the new standard is communicated to anyone capturing documents.

By systematically reviewing failures and improving the *quality of the images* fed into the system, a business can squeeze massive efficiency gains out of standard, free OCR tools, proving that the best OCR optimization often happens before the software even sees the image.
