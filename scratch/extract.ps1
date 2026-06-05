Copy-Item 'f:\Mahfoz\Advocacy\Resource\THE JUDGMENT IN ORIGINAL SUIT_CASE.docx' 'f:\Mahfoz\Advocacy\scratch\doc.zip' -Force
Expand-Archive -Path 'f:\Mahfoz\Advocacy\scratch\doc.zip' -DestinationPath 'f:\Mahfoz\Advocacy\scratch\docx' -Force
$xml = Get-Content 'f:\Mahfoz\Advocacy\scratch\docx\word\document.xml' -Raw
$text = $xml -replace '<[^>]+>', ' '
$text | Out-File 'f:\Mahfoz\Advocacy\scratch\docx_text.txt' -Encoding utf8
