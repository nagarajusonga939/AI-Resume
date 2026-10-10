import os
import re
import pymupdf


def clean_extracted_text(text: str) -> str:
    """Normalize extracted text whitespace and linebreaks."""
    if not text:
        return ""
    # Replace non-breaking spaces and carriage returns
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    # Collapse multiple consecutive empty lines to maximum 2
    text = re.sub(r'\n{3,}', '\n\n', text)
    # Collapse multiple spaces and tabs within lines
    lines = [re.sub(r'[ \t]+', ' ', line).strip() for line in text.split('\n')]
    return '\n'.join(lines).strip()


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract full text from a PDF file using PyMuPDF.
    
    Args:
        file_path (str): Absolute or relative path to the PDF document.
        
    Returns:
        str: Clean extracted plain text.
        
    Raises:
        FileNotFoundError: If the file path does not exist.
        ValueError: If the file is not a valid or readable PDF.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"PDF file not found at: {file_path}")

    try:
        doc = pymupdf.open(file_path)
    except Exception as e:
        raise ValueError(f"Failed to open or decode PDF: {str(e)}")

    extracted_pages = []
    try:
        for page_num in range(len(doc)):
            page = doc[page_num]
            text = page.get_text("text")
            if text:
                extracted_pages.append(text)
    except Exception as e:
        raise ValueError(f"Error extracting text from PDF page: {str(e)}")
    finally:
        doc.close()

    full_text = "\n\n".join(extracted_pages)
    clean_text = clean_extracted_text(full_text)

    if not clean_text:
        # Check if the PDF has text or might be scanned/image-only
        raise ValueError("The PDF document does not contain readable text. It might be an image or scanned document.")

    return clean_text
