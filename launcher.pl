use strict;
use warnings FATAL => 'all';

my $file = './external/actions.bat';
open my $info, $file or die "Could not open $file: $!";

while( my $line = <$info>)  {
    print $line;
    system $line;
    last if $. == 2;
}

close $info;
exit(1)