# OCR Mistakes That Cost Money

Optical Character Recognition (OCR) is a massive time-saver for businesses processing invoices, receipts, and forms. However, the convenience of automation can induce a false sense of security. When OCR errors go unnoticed, they can lead to significant financial losses.

Here is a look at common, costly OCR mistakes and the verification processes required to prevent them.

## The Decimal Point Disaster

The most common and dangerous OCR error involves punctuation, specifically commas and decimal points.
*   **The Scenario:** An invoice for $1,500.00 is processed. Due to a stray pen mark or a smudge on the scan, the OCR engine misses the decimal point, extracting the total as 150000.
*   **The Result:** If this data flows directly into an automated accounts payable system without human review, the company overpays by $148,500.

## The 'B' vs '8' IBAN Failure

Banking details, such as IBANs or routing numbers, are highly sensitive to single-character errors.
*   **The Scenario:** An OCR engine reads an '8' as a 'B', or a '0' (zero) as an 'O' (letter) in a bank account number.
*   **The Result:** The payment bounces, resulting in late fees, angry vendors, and administrative overhead to trace the failed transaction and reissue the payment.

## The Quantity vs. Price Swap

Complex table layouts often confuse standard OCR engines.
*   **The Scenario:** An invoice lists 100 widgets at $5.00 each. The OCR engine reads straight across the page, confusing the columns, and extracts that the company ordered 5 widgets at $100.00 each.
*   **The Result:** Inventory management is thrown off, and the payment amount is incorrect.

## Implementing the "Human Gate"

To prevent these costly mistakes, businesses must implement strict verification workflows—what we call the "Human Gate." OCR should be treated as a data entry assistant, not a final authority.

1. **Highlight Critical Fields:** Train staff to never trust OCR output for totals, account numbers, and tax IDs. These fields must *always* be verified against the original image.
2. **Checksum Validations:** Use software that automatically validates the extracted data (e.g., ensuring Line Item Total + Tax = Invoice Total). If the math doesn't add up, the document is flagged for manual review.
3. **Format Rules:** Implement strict data formatting rules. If a field expecting a 9-digit routing number receives 8 digits and a letter, the system should reject it immediately.

By recognizing the limitations of OCR and enforcing verification checklists, businesses can enjoy the speed of automation without the financial risk of silent errors.
